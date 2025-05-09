import supabase from '../../backend/supabasesetup.js'

export default async function loginUser( { email, password }){
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        return { success: false, error: error.message}
    }
//if the login was successful, we return a token
    return { success: true, session: data.session, user: data.user}
}
