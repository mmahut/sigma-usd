import React from 'react';
import { Flip, Slide, toast } from 'react-toastify';
import { Address } from '@coinbarn/ergo-ts';

const explorerUrl = 'https://explorer.ergoplatform.com/en/';

export function friendlyToken(token, quantity = true, length = 13) {
    if (!token) return ''
    let res = '';
    if (quantity) res = token.amount + ' of ';
    res +=
        token.tokenId.slice(0, length) +
        '...' +
        token.tokenId.slice(-length) +
        ' token';
    return res
}

export function friendlyAddress(addr, length = 13) {
    if (addr === undefined || addr.slice === undefined) return ''
    return addr.slice(0, length) + '...' + addr.slice(-length);
}

export function getTxUrl(txId) {
    return explorerUrl + 'transactions/' + txId;
}

export function getAddrUrl(addr) {
    return explorerUrl + 'addresses/' + addr;
}

export function showMsg(message, isError = false, isWarning = false) {
    let status = 'default'
    if (isError) status = 'error'
    if (isWarning) status = 'warning'
    toast(message, {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        type: status,
    });
}

export function showStickyMsg(message, isError = false) {
    toast(message, {
        transition: Flip,
        closeButton: true,
        autoClose: false,
        closeOnClick: false,
        position: 'top-center',
        type: isError ? 'error' : 'default',
    });
}

export function isWalletSaved() {
    return localStorage.getItem('wallet') !== null;
}

export function isAssembler() {
    return isWalletSaved() && getWalletType() === 'assembler';
}

export function getWalletAddress() {
    if (!isWalletSaved()) return ''
    return JSON.parse(localStorage.getItem('wallet')).address
}

export function getWalletType() {
    return JSON.parse(localStorage.getItem('wallet')).type
}

export function clearWallet() {
    localStorage.removeItem('wallet');
}

export function setAnyWallet(address) {
    localStorage.setItem(
        'wallet',
        JSON.stringify({
            type: 'any',
            address: address,
        })
    );
}

export function getUrl(url) {
    if (!url.startsWith('http')) url = 'http://' + url;
    if (url.endsWith('/')) url = url.slice(0, url.length - 1);
    return url;
}

export async function copyToClipboard(text) {
    return navigator.clipboard.writeText(text).then(_ => showMsg("Copied!"))
}

export function isAddressValid(address) {
    try {
        return (new Address(address).isValid())
    } catch (_) {
        return false
    }
}

export function getForKey(key) {
    let reqs = JSON.parse(localStorage.getItem(key));
    if (reqs === null) reqs = []
    return reqs
}

export function setForKey(reqs, key) {
    localStorage.setItem(key, JSON.stringify(reqs));
}

export function addReq(req, key, uniqueBy = 'nothing!') {
    let reqs = getForKey(key)
    if (req[uniqueBy] !== undefined) reqs = reqs.filter(cur => cur[uniqueBy] !== req[uniqueBy])
    reqs = reqs.concat([req])
    setForKey(reqs, key)
}
