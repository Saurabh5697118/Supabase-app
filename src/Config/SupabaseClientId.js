import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbHlvc2J4dHJ3eHlqZnRla2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3ODQ2NDMsImV4cCI6MjAzODM2MDY0M30.US1Sbl_PWQL_O1PIz9TZ8CKYXoY6vEWHibL_YRID6pk"
const supabase = createClient("https://ralyosbxtrwxyjftekdy.supabase.co", supabaseKey);


export default supabase;
