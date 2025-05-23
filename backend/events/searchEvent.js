import supabase from '../../backend/supabaseSetup.js'

export default async function searchEvent(query) {
    const { data, error } = await supabase
        .from('events') //table name
        .select('*') //select all columns
        .ilike('event_name', `%${query}%`); //case-insensitive partial match

    if (error) {
        throw new Error(error.message);
    }

    return data;
}