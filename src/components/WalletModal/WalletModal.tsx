import ModalContainer from 'components/ModalContainer/ModalContainer';
import React, { useState } from 'react';
import {
    clearWallet,
    getWalletAddress,
    isAddressValid, setAnyWallet
} from '../../utils/helpers';
import { toast } from 'react-toastify';

interface Props {
    onClose: () => void;
    open: boolean;
}

enum Wallets {
    ANY_WALLET = 'ANY_WALLET',
}

const TABS = {
    [Wallets.ANY_WALLET]: 'Any Wallet',
};

const WalletModal = ({ open, onClose }: Props) => {
    const [currentTab, setCurrentTab] = useState(Wallets.ANY_WALLET);
    const [address, setAddress] = useState(getWalletAddress);

    return (
        <ModalContainer open={open} onClose={onClose}>
            <div className="wallet-modal">
                <div className="wallet-modal__tabs">
                    {Object.keys(TABS).map((key) => (
                        <div
                            key={key}
                            className="wallet-modal__tab"
                            onClick={() => setCurrentTab(key as Wallets)}
                        >
                            {TABS[key as Wallets]}
                        </div>
                    ))}
                </div>
                <div className="wallet-modal__content">
                    {currentTab === Wallets.ANY_WALLET && (
                        <>
                            <p className="wallet-modal__paragraph">
                                This option is using the assembler service.
                            </p>
                            <p className="wallet-modal__paragraph">
                                The assembler service is an intermediate step
                                that you can find out more about{' '}
                                <a
                                    href="https://www.ergoforum.org/t/tx-assembler-service-bypassing-node-requirement-for-dapps/443"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    here
                                </a>
                                . Your funds will be safe using smart contracts
                                that prevent the service from cheating!
                            </p>
                            <div className="wallet-modal__input-group">
                                <label
                                    htmlFor="address"
                                    className="wallet-modal__input-label"
                                >
                                    Address
                                </label>
                                <input
                                    defaultValue={getWalletAddress()}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="wallet-modal__input"
                                    id="address"
                                />
                                <span className="wallet-modal__input-subtext">
                                    Your minted/redeemed assets will be sent to
                                    this address
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <div className="wallet-modal__buttons">
                    <button
                        onClick={() => {
                            setAnyWallet(address);
                            toast.success('Wallet is set up successfully.');
                            onClose();
                        }}
                        disabled={!isAddressValid(address)}
                        type="button"
                        className="btn-blue mr-lg-20 mr-0"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            toast.success('Wallet is cleared successfully.');
                            clearWallet();
                            setAddress('');
                            onClose();
                        }}
                        type="button"
                        className="btn-black"
                    >
                        Clear wallet info
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default WalletModal;
