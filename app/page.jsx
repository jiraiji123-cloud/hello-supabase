import { revalidatePath } from 'next/cache';

// 1. Initialize connection parameters
const SUPABASE_URL = "https://kwpzufzapwkiznazepgi.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cHp1ZnphcHdraXpuYXplcGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1OTQ0MDAsImV4cCI6MjA5NjE3MDQwMH0._nzF-YNNbbN9MLvx8t_vghy3gDMwnAu6j2j5oCS4tT8";

// 2. This is a Server Action (conceptually identical to processing a POST request in PHP)
async function addName(formData) {
  'use server';
  const name = formData.get('newName');
  if (!name) return;

  // Perform a standard POST request directly to Supabase's built-in REST API
  await fetch(`${SUPABASE_URL}/rest/v1/greetings`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name }),
  });

  // Refresh the page automatically to show fresh data
  revalidatePath('/');
}

// 3. The Main Page Component (Runs on the server, just like a PHP script)
export default async function Home() {
  // Fetch data directly from the database API on server load
  const response = await fetch(`${SUPABASE_URL}/rest/v1/greetings?select=*`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
    cache: 'no-store' // Ensure we always pull live data
  });
  
  const greetings = await response.json() || [];

  return (
       // If greetings isn't an array (meaning the API call failed), show the raw error message
      if (!Array.isArray(greetings)) {
        return (
          <div style={{ padding: '40px', color: 'red', fontFamily: 'sans-serif' }}>
            <h3>Database Connection Failed</h3>
            <p>Supabase returned an error instead of data. Here is the response:</p>
            <pre style={{ background: '#f4f4f4', padding: '15px', color: '#333' }}>
              {JSON.stringify(greetings, null, 2)}
            </pre>
          </div>
        );
      }
    
      // If it IS an array, render the page normally
      return (
        <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
          <h1>Hello, Modern Web!</h1>
          
          <form action={addName} style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              name="newName" 
              placeholder="Enter a new name" 
              required 
              style={{ padding: '8px', marginRight: '8px', width: '200px' }}
            />
            <button type="submit" style={{ padding: '8px 16px' }}>Add Name</button>
          </form>
    
          <h3>Database Entries:</h3>
          <ul>
            {greetings.map((item) => (
              <li key={item.id}>Hello, {item.name}!</li>
            ))}
          </ul>
        </div>
      );
    }
  );
}
