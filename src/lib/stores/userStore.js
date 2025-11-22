import { writable, derived } from 'svelte/store';
import { walletAddress } from './walletStore';
import { db } from '../db';

// Initial state structure
const createInitialState = () => ({
    users: {}, // keyed by wallet address (lowercase)
    loading: false,
    error: null
});

function createUserStore() {
    const { subscribe, set, update } = writable(createInitialState());

    return {
        subscribe,

        // Load user data from DB
        loadUser: async (address) => {
            if (!address) return;
            const addr = address.toLowerCase();

            update(s => ({ ...s, loading: true }));

            try {
                let userData = await db.getUser(addr);

                if (!userData) {
                    // Create new user if not found
                    userData = await db.createUser(addr);
                }

                update(state => {
                    state.users[addr] = userData;
                    state.loading = false;
                    return state;
                });
            } catch (err) {
                console.error("Failed to load user:", err);
                update(s => ({ ...s, loading: false, error: err.message }));
            }
        },

        // Update a specific user's profile
        updateProfile: async (address, profileData) => {
            const addr = address.toLowerCase();

            // Optimistic update
            update(state => {
                if (state.users[addr]) {
                    state.users[addr].profile = { ...state.users[addr].profile, ...profileData };
                }
                return state;
            });

            try {
                await db.updateProfile(addr, profileData);
            } catch (err) {
                console.error("Failed to update profile:", err);
                // Revert or show error (omitted for simplicity)
            }
        },

        // Update a specific user's airdrop progress
        updateAirdrop: async (address, slug, airdropData) => {
            const addr = address.toLowerCase();

            // Optimistic update
            update(state => {
                if (state.users[addr]) {
                    const index = state.users[addr].airdrops.findIndex(a => a.slug === slug);
                    if (index !== -1) {
                        state.users[addr].airdrops[index] = { ...state.users[addr].airdrops[index], ...airdropData };
                    }
                }
                return state;
            });

            try {
                await db.updateAirdrop(addr, slug, airdropData);
            } catch (err) {
                console.error("Failed to update airdrop:", err);
            }
        },

        // Add a new airdrop to the user's list
        addAirdrop: async (address, newAirdrop) => {
            const addr = address.toLowerCase();

            // Optimistic update
            update(state => {
                if (state.users[addr]) {
                    state.users[addr].airdrops.push(newAirdrop);
                }
                return state;
            });

            try {
                await db.addAirdrop(addr, newAirdrop);
            } catch (err) {
                console.error("Failed to add airdrop:", err);
            }
        },

        // Set onboarding dismissed
        dismissOnboarding: async (address) => {
            const addr = address.toLowerCase();

            update(state => {
                if (state.users[addr] && state.users[addr].profile) {
                    state.users[addr].profile.onboarding_dismissed = true;
                }
                return state;
            });

            try {
                await db.dismissOnboarding(addr);
            } catch (err) {
                console.error("Failed to dismiss onboarding:", err);
            }
        },

        // Reset user data (locally only, to clear cache on disconnect if needed)
        resetUser: (address) => update(state => {
            // We might not want to delete from DB on reset, just clear local state
            const addr = address.toLowerCase();
            if (state.users[addr]) {
                delete state.users[addr];
            }
            return state;
        }),

        // Ensure user exists (called when connecting) - now just an alias for loadUser
        initUser: async (address) => {
            return await userStore.loadUser(address);
        }
    };
}

export const userStore = createUserStore();

// Derived store for the CURRENT user's data
export const currentUserData = derived(
    [userStore, walletAddress],
    ([$userStore, $walletAddress]) => {
        if (!$walletAddress) return null;
        const addr = $walletAddress.toLowerCase();
        return $userStore.users[addr] || null; // Return null if not loaded yet
    }
);

