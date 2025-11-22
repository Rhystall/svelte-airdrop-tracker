import { supabase } from './supabaseClient';
import { airdrop as defaultAirdrops } from './airdrop';

export const db = {
    // Get user profile and airdrops
    getUser: async (address) => {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', address)
            .single();

        if (userError && userError.code !== 'PGRST116') { // PGRST116 is "Row not found"
            console.error('Error fetching user:', userError);
            return null;
        }

        if (!user) return null;

        const { data: airdrops, error: airdropError } = await supabase
            .from('user_airdrops')
            .select('*')
            .eq('user_wallet_address', address);

        if (airdropError) {
            console.error('Error fetching airdrops:', airdropError);
        }

        // Merge DB airdrops with default airdrops to ensure we have a complete list
        // This handles cases where we add new default airdrops later
        const mergedAirdrops = defaultAirdrops.map(def => {
            const existing = airdrops?.find(a => a.slug === def.slug);
            return existing ? { ...def, ...existing } : { ...def, completed_quests: 0 };
        });

        // Also include any custom airdrops the user might have added that aren't in defaults
        const customAirdrops = airdrops?.filter(a => !defaultAirdrops.find(d => d.slug === a.slug)) || [];

        return {
            profile: user,
            airdrops: [...mergedAirdrops, ...customAirdrops]
        };
    },

    // Create a new user
    createUser: async (address) => {
        const defaultProfile = {
            wallet_address: address,
            name: 'Farmer',
            role: 'Airdrop Farmer',
            bio: 'Grinding L1, L2, and testnet airdrops.',
            goals: ''
        };

        const { data, error } = await supabase
            .from('users')
            .insert(defaultProfile)
            .select()
            .single();

        if (error) {
            console.error('Error creating user:', error);
            throw error;
        }

        // Initialize default airdrops for the user
        const initialAirdrops = defaultAirdrops.map(a => ({
            user_wallet_address: address,
            slug: a.slug,
            completed_quests: 0,
            status: 'Not Started'
        }));

        const { error: airdropError } = await supabase
            .from('user_airdrops')
            .insert(initialAirdrops);

        if (airdropError) {
            console.error('Error initializing airdrops:', airdropError);
        }

        return {
            profile: data,
            airdrops: defaultAirdrops.map(a => ({ ...a, completed_quests: 0 }))
        };
    },

    // Update user profile
    updateProfile: async (address, profileData) => {
        const { data, error } = await supabase
            .from('users')
            .update(profileData)
            .eq('wallet_address', address)
            .select()
            .single();

        if (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
        return data;
    },

    // Update airdrop progress
    updateAirdrop: async (address, slug, airdropData) => {
        // Check if the airdrop entry exists first
        const { data: existing } = await supabase
            .from('user_airdrops')
            .select('id')
            .eq('user_wallet_address', address)
            .eq('slug', slug)
            .single();

        let result;
        if (existing) {
            const { data, error } = await supabase
                .from('user_airdrops')
                .update(airdropData)
                .eq('user_wallet_address', address)
                .eq('slug', slug)
                .select()
                .single();

            if (error) throw error;
            result = data;
        } else {
            // Create if not exists
            const { data, error } = await supabase
                .from('user_airdrops')
                .insert({
                    user_wallet_address: address,
                    slug,
                    ...airdropData
                })
                .select()
                .single();

            if (error) throw error;
            result = data;
        }
        return result;
    },

    // Add a new airdrop
    addAirdrop: async (address, airdrop) => {
        const { data, error } = await supabase
            .from('user_airdrops')
            .insert({
                user_wallet_address: address,
                slug: airdrop.slug,
                completed_quests: 0,
                status: 'Not Started',
                ...airdrop
            })
            .select()
            .single();

        if (error) {
            console.error('Error adding airdrop:', error);
            throw error;
        }
        return data;
    },

    // Dismiss onboarding
    dismissOnboarding: async (address) => {
        const { error } = await supabase
            .from('users')
            .update({ onboarding_dismissed: true })
            .eq('wallet_address', address);

        if (error) console.error('Error dismissing onboarding:', error);
    }
};
