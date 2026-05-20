import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bormoicfpdrocwnujhqn.supabase.co';
const supabaseAnonKey = 'sb_publishable_R1oJssxSex1bqRMrXmoQUw_z-KkOXNZ';

export const supabaseCoordinacion = createClient(supabaseUrl, supabaseAnonKey);
