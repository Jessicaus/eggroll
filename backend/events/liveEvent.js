import supabase from '../../backend/supabaseSetup.js';

export default async function liveEvent(id, status) {
    console.log('Updating is_live for ID:', id, 'to status:', status)
    const { error } = await supabase
          .from('events')
          .update({ is_live: status })
          .eq('id', id);
    
        if (error) {
          console.error('Error updating is_live:', error);
        }

    return error;
}