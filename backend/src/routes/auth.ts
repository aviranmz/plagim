import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { db } from '../database'
import { users } from '../database/schema'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Login
router.post('/login', async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    // Find user
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (user.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const foundUser = user[0]
    if (!foundUser) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    // Check if user is active
    if (!foundUser.isActive) {
      res.status(401).json({ error: 'Account is deactivated' })
      return
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, foundUser.password)
    
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      },
      secret,
      { expiresIn: '24h' }
    )

    // Set secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })

    res.json({
      message: 'Login successful',
      user: {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Logout
router.post('/logout', (req, res): void => {
  res.clearCookie('token')
  res.json({ message: 'Logout successful' })
})

// Get current user
router.get('/me', authenticateToken, (req: AuthRequest, res): void => {
  res.json({
    user: req.user
  })
})

// Change password
router.post('/change-password', authenticateToken, async (req: AuthRequest, res): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: 'Current and new passwords are required' })
      return
    }

    if (newPassword.length < 6) {
      res.status(400).json({ error: 'New password must be at least 6 characters' })
      return
    }

    // Get current user
    const user = await db.select().from(users).where(eq(users.id, req.user!.id)).limit(1)
    
    if (user.length === 0) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // Verify current password
    const currentUser = user[0]
    if (!currentUser) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    
    const isValidPassword = await bcrypt.compare(currentPassword, currentUser.password)
    
    if (!isValidPassword) {
      res.status(401).json({ error: 'Current password is incorrect' })
      return
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await db.update(users)
      .set({ 
        password: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(users.id, req.user!.id))

    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
