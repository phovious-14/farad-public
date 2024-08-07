import {createClient} from "@supabase/supabase-js"

export const supabase = createClient(
    "https://acmbwuxnjyelsjlemebk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjbWJ3dXhuanllbHNqbGVtZWJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjEzMzYyMywiZXhwIjoyMDM3NzA5NjIzfQ.Wj2hojsH5pBRZtqEm1yhKSjHd2pvY40VxMcbvkmp_tM"
)