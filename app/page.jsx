// 1. Initialize connection parameters
const SUPABASE_URL = "https://kwpzufzapwkiznazepgi.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cHp1ZnphcHdraXpuYXplcGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1OTQ0MDAsImV4cCI6MjA5NjE3MDQwMH0._nzF-YNNbbN9MLvx8t_vghy3gDMwnAu6j2j5oCS4tT8"; // <-- Triple check this key!

export default async function Home() {
  // Try to fetch from Supabase
  const response = await fetch(`${SUPABASE_URL}/rest/v1/greetings`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
    cache: 'no-store'
  });
  
  const data = await response.json();

  // Just print the raw data directly to the screen like PHP's var_dump() or print_r()
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px' }}>
      <h1>Debugging Supabase Connection</h1>
      <p>This is a raw dump of what your database is returning:</p>
      <pre style={{ background: '#f4f4f4', padding: '20px', borderRadius: '5px', border: '1px solid #ccc' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
