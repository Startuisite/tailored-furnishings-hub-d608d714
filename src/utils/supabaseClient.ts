
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to submit contact form data to Supabase
export const submitContactForm = async (formData: {
  name?: string;
  phone: string;
  email?: string;
  message?: string;
  isDesigner?: boolean;
  source: string;
}) => {
  // Determine the userType based on form data and source
  let userType = 'customer'; // Default value
  
  // If explicitly marked as designer via checkbox
  if (formData.isDesigner) {
    userType = 'designer';
  }
  
  // Override based on page source if it's from specific pages
  if (formData.source === 'designers_page') {
    userType = 'designer';
  } else if (formData.source === 'customers_page') {
    userType = 'customer';
  }
  
  // Prepare the data to be inserted
  const dataToInsert = {
    name: formData.name || null,
    phone: formData.phone,
    email: formData.email || null,
    message: formData.message || null,
    user_type: userType,
    source: formData.source,
    created_at: new Date().toISOString(),
  };

  // Insert the data into the 'contact_requests' table
  const { data, error } = await supabase
    .from('contact_requests')
    .insert([dataToInsert]);

  if (error) {
    console.error('Error submitting form to Supabase:', error);
    throw error;
  }

  return data;
};
