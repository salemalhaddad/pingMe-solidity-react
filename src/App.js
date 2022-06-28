import React, { useEffect, useState } from "react";
import "./App.css";
import abi from "./utils/Portal.json";
import { ethers } from "ethers";

const App = () => {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");
  const [allPings, setAllPings] = useState([]);

  const contractAddress = "0x02819C2bc309d4F4523362fBCD204CC02B8A6C24";

  const contractABI = abi.abi;

  const textCount = 'Show # of Pings';
  const [buttonText, setButtonText] = useState(textCount);

  const getAllPings = async () => {
	try {
		const { ethereum } = window;
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const pingPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

			const pings = await pingPortalContract.getAllPings();

			console.log(pings);

			let pingsCleaned = [];
			pings.forEach(ping => {
				pingsCleaned.push({
					address: ping.pinger,
					timestamp: new Date(ping.timestamp * 1000),
					message: ping.message
				});
			});

			setAllPings(pingsCleaned);
		} else {
			console.log("Ethereum obj doesn't exist")
		}
	} catch (error) {
		console.log(error)
	}
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
		getAllPings()
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
   const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const ping = async (x) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const pingPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await pingPortalContract.getTotalPings();
        console.log("Retrieved total ping count...", count.toNumber());

		const pingTxn = await pingPortalContract.ping(x);
        console.log("Mining...", pingTxn.hash);

        await pingTxn.wait();
        console.log("Mined -- ", pingTxn.hash);

        count = await pingPortalContract.getTotalPings();
		// let x = count.toNumber();
        console.log("Retrieved total ping count...", count.toNumber());
		window.location.reload(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
}

const totalPings = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
		const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
		const pingPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await pingPortalContract.getTotalPings();
		let x = count.toNumber();
        setButtonText('There are ' + x + ' finalized Pings (transactions)')

		setTimeout(() => {
			setButtonText(textCount);
		}, 1000);
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          I am Salem and I don't like defining myself under the umbrella of my career work
        </div>
		<br/>

		<input type="text" id="input"></input>

        <button className="pingButton" onClick={() => {
			 ping(document.getElementById("input").value);
			 document.getElementById('input').value = '';
		}
		}>
          Ping Me
        </button>


		{currentAccount && (
			<button className="pingButton" onClick={totalPings}>
				{buttonText}
			</button>
        )}
		<p> bottom msg is latest </p>
        {!currentAccount && (
          <button className="pingButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

		{allPings.map((ping, index) => {
			return(
			<div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {ping.address}</div>
              <div>Time: {ping.timestamp.toString()}</div>
              <div>Message: {ping.message}</div>
            </div>)
		})}

      </div>
    </div>
    );
  }
export default App
