import React from 'react';


export function Connect() {
        async function requestAccount() {
            if(window.ethereum) {
                console.log('detected')
    
                try{
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    console.log(accounts);
                } catch (error) {
                    console.log('Error connecting...');
                }
    
            } else {
                console.log('Meta Mask not detected');
            }
            }

        return(
            <div>
                <button type="button" className="btn btn-outline-light"
                onClick={requestAccount}
                >Connect</button>
            </div>
        )

    }