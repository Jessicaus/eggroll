import supabase from '../../backend/supabaseSetup.js'


export default async function loginUser( { email, password }){
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error || !data.session) {
        throw new Error(error?.message || 'Invalid email or password');
      }

    console.log('Attempting login for:', email);

if (error) {
    console.error('Supabase Auth Error:', error.message);
    throw new Error(error.message);
  }
//if the login was successful, we return a token
    return { success: true, session: data.session, user: data.user}


}


/*
export default async function loginUser({ email, password }) {
    // 1. Get user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
  
    if (error || !user) {
      throw new Error('User not found');
    }
  
    // 2. Check password match (⚠️ only for dev – no hashing yet)
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
  
    // 3. Return user info (never send password back)
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }
*/

  