import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
    supabase: SupabaseClient<any, "public", any>;
  constructor() 
          {
          this.supabase = createClient("https://cnoklpjbfxuwneivmjcq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNub2tscGpiZnh1d25laXZtamNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDM0NjksImV4cCI6MjA2MDM3OTQ2OX0.aj3dhviaREaCSTYSUUwxaJUgjxIcPBQCYWIH-n0S_pk");
      }
}
