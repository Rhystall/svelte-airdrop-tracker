<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  export let isOpen = false;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function selectProvider(type) {
    dispatch('select', type);
    close();
  }
</script>

{#if isOpen}
  <div class="modal-overlay" on:click={close} transition:fade={{ duration: 200 }}>
    <div class="modal-content" on:click|stopPropagation transition:scale={{ duration: 200, start: 0.95 }}>
      <div class="modal-header">
        <h2 class="modal-title">Connect Wallet</h2>
        <button class="modal-close" on:click={close}>✕</button>
      </div>
      
      <div class="wallet-options">
        <button class="wallet-option" on:click={() => selectProvider('injected')}>
          <div class="wallet-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <div class="wallet-info">
            <span class="wallet-name">Browser Wallet</span>
            <span class="wallet-desc">MetaMask, Rabby, etc.</span>
          </div>
        </button>

        <button class="wallet-option" on:click={() => selectProvider('walletconnect')}>
          <div class="wallet-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32" class="text-blue-500">
              <path d="M6.5 14.5v-3.22l2.28 2.28 1.42-1.42-3.7-3.7-3.7 3.7 1.42 1.42 2.28-2.28v3.22h-3v-3.22l2.28 2.28 1.42-1.42-3.7-3.7-3.7 3.7 1.42 1.42 2.28-2.28v3.22h-3z" transform="translate(12,12) scale(0.8)"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
          <div class="wallet-info">
            <span class="wallet-name">WalletConnect</span>
            <span class="wallet-desc">Mobile wallets, Rainbow, etc.</span>
          </div>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: rgba(17, 25, 40, 0.75);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.125);
    border-radius: 24px;
    width: 100%;
    max-width: 400px;
    padding: 32px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    position: relative;
    overflow: hidden;
  }

  /* Shine effect */
  .modal-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transform: skewX(-25deg);
    pointer-events: none;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .modal-close {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transform: rotate(90deg);
  }

  .wallet-options {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    z-index: 1;
  }

  .wallet-option {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    position: relative;
    overflow: hidden;
  }

  .wallet-option:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
  }

  .wallet-option:active {
    transform: translateY(0) scale(0.98);
  }

  .wallet-icon {
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 8px;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .wallet-option:hover .wallet-icon {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  .wallet-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .wallet-name {
    font-weight: 600;
    color: #ffffff;
    font-size: 1.1rem;
    letter-spacing: 0.01em;
  }

  .wallet-desc {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
