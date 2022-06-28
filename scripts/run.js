// This file compiles the contract, deploys to blockchain, and console.log a string
const main = async () => {
	const pingContractFactory = await hre.ethers.getContractFactory("Portal"); //complies contract and generate files under artifacts folder
	const pingContract = await pingContractFactory.deploy(); // creates a eth network for the compiled contract
	await pingContract.deployed();
	console.log("Contract addy:", pingContract.address);


	let pingCount;
	pingCount = await pingContract.getTotalPings();
	console.log(pingCount.toNumber());

	let pingTxn = await pingContract.ping("A nessage");
	await pingTxn.wait();

	const [_, randomPerson] = await hre.ethers.getSigners();
	pingTxn = await pingContract.connect(randomPerson).ping("Another message");
	await pingTxn.wait();

	let allPings = await pingContract.getAllPings();
	console.log(allPings)
  };

  const runMain = async () => {
	try {
	  await main();
	  process.exit(0); // exit Node process without error
	} catch (error) {
	  console.log(error);
	  process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
	}
	// Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };

  runMain();
