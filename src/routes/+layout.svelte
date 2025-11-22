<script>
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { isWalletModalOpen, connectWallet, walletAddress } from '$lib/stores/walletStore';
	import { userStore } from '$lib/stores/userStore';
	import WalletModal from '$lib/components/WalletModal.svelte';

	let { children } = $props();

	function handleWalletSelect(event) {
		connectWallet(event.detail);
	}

	$effect(() => {
		if (!browser) return;

		const path = $page.url.pathname;
		const isConnected = !!$walletAddress;

		// Sync user data when connected
		if (isConnected) {
			userStore.initUser($walletAddress);
		}

		// Protected routes (App zone)
		if (path.startsWith('/app') || path.startsWith('/profile') || path.startsWith('/airdrops')) {
			if (!isConnected) {
				goto('/');
			}
		} 
		// Public routes (Landing zone)
		else if (path === '/') {
			if (isConnected) {
				goto('/app');
			}
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<WalletModal 
	isOpen={$isWalletModalOpen} 
	on:close={() => isWalletModalOpen.set(false)}
	on:select={handleWalletSelect}
/>
