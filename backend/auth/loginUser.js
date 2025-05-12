import supabase from '../../backend/supabaseSetup.js'


export default async function loginUser( { email, password }){
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error || !data.session) {
        throw new Error(error?.message || 'Invalid email or password');
      }

//if the login was successful, we return a token
    return { success: true, session: data.session, user: data.user}


}




  