# 🏁 Sport Team Events Calendar

Race Register is a lightweight multi-language web application designed to manage sports events, participant interest, and registrations within a team or organization.

It provides an intuitive calendar interface, role-based access control, and real-time data powered by Supabase.

---

## 🚀 Features

### 🔐 Authentication & Roles
- Supabase authentication
- Role-based access control (Admin / User)
- Row-Level Security (RLS) enforced at database level
- Admin-only event creation

### 🌍 Multi-language Support
- French 🇫🇷
- English 🇬🇧
- Spanish 🇪🇸
- User preferred language stored in database (`preferred_language`)
- Dynamic UI translation via custom i18n engine

### 📅 Interactive Calendar
- Monthly view with multi-month scroll
- Event dates visually highlighted
- Discipline-based color coding
- Support for multiple disciplines on the same day
- Tooltip summary per day

### 🏃 Event Management
- Create event (Admin only)
- One record per:
  - Event day
  - Discipline
- No separation by category or distance

Event fields:
- Name (required)
- Description
- Date (required)
- Website
- Discipline (required)

### 👥 Participation Tracking
Each user can:
- Mark as **Interested**
- Register as **Registered**
- Remove themselves


