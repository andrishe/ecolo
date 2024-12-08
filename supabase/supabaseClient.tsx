import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Importer la bibliothèque uuid

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY as string;

function createClerkSupabaseClient() {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await window.Clerk?.session?.getToken({
          template: 'supabase',
        });

        // Insert the Clerk Supabase token into the headers
        const headers = new Headers(options?.headers);
        console.log('clerkToken:', clerkToken);
        headers.set('Authorization', `Bearer ${clerkToken}`);

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });
}

export const supabase = createClerkSupabaseClient();

// Fonction pour insérer un profil
export const insertProfile = async (profile: {
  username: string;
  email: string;
}) => {
  console.log('Inserting profile:', profile);
  const { data, error } = await supabase.from('profiles').insert([
    {
      id: uuidv4(), // Générer un UUID valide
      ...profile,
    },
  ]);

  if (error) {
    console.error('Error inserting profile:', error);
  } else {
    console.log('Inserted profile:', data);
  }
  return { data, error };
};

// Fonction pour récupérer les profils
export const fetchProfiles = async () => {
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) {
    console.error('Error fetching profiles:', error);
  } else {
    console.log('Profiles:', data);
  }
  return { data, error };
};

// Fonction pour récupérer les données
export const fetchData = async () => {
  const { data, error } = await supabase.from('data').select('*');

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Data:', data);
  }
  return { data, error };
};

// Fonction pour mettre à jour un profil
export const updateProfile = async (id: number, updates: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating profile:', error);
  } else {
    console.log('Updated profile:', data);
  }
  return { data, error };
};

// Fonction pour supprimer un profil
export const deleteProfile = async (id: number) => {
  const { data, error } = await supabase.from('profiles').delete().eq('id', id);

  if (error) {
    console.error('Error deleting profile:', error);
  } else {
    console.log('Deleted profile:', data);
  }
  return { data, error };
};
