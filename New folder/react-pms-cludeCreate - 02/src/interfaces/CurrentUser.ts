import { dummyMembers } from "./Member"

// There's no real authentication yet (Phase 1, frontend only), so we pin the
// "logged in" person to one existing team member. Navbar and Dashboard both
// read from here, so the name/avatar/role stay consistent everywhere instead
// of using unrelated placeholder demo data.
export const CURRENT_USER = dummyMembers[0];
