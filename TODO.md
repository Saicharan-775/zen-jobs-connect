# TODO: Fix Supabase Client Environment Variables

- [x] Update src/supabaseClient.ts to use import.meta.env instead of process.env and change variable names to VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- [ ] Update .env file to use VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY instead of REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
- [ ] Test the application to ensure the error is resolved

# TODO: Restructure Dashboard Flow

- [x] Create ResumeUpload page with ResumeUploader and AIMentor components
- [x] Update TransitionScreen to navigate to /resume-upload instead of /dashboard
- [x] Remove ResumeUploader and AIMentor from Dashboard.tsx
- [x] Add /resume-upload route to App.tsx
- [x] Add navigation buttons (Browse Jobs, View Dashboard) to ResumeUpload page
- [x] Make AIMentor conditional - only show after resume upload
- [x] Improve styling for ResumeUpload page with gradients and better cards
- [x] Remove ResumeUploader and AIMentor from CandidateDashboard.tsx
- [x] Move LearningHub to TalentPrograms page
- [x] Create TalentPrograms page with LearningHub component
- [x] Update App.tsx to use TalentPrograms page for /talent-programs route
- [x] Remove LearningHub from Dashboard.tsx
- [ ] Test the new flow: Login -> Transition -> Resume Upload -> Dashboard

# TODO: Fix Leaderboard and Dark Mode Issues

- [x] Add 5 more users to leaderboard data (now top 10)
- [x] Update button hover colors for better dark mode visibility
- [x] Fix Leaderboard podium with proper heights (1st tallest, 2nd medium, 3rd shortest)
- [x] Ensure Leaderboard shows top 10 users correctly
- [ ] Test leaderboard display and dark mode button hovers
