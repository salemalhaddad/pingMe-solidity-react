// This file compiles the contract, deploys to blockchain, and console.log a string
const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const pingContractFactory = await hre.ethers.getContractFactory("Portal"); //complies contract and generate files under artifacts folder
	const pingContract = await pingContractFactory.deploy(); // creates a eth network for the compiled contract
	await pingContract.deployed();

	console.log("Contract deployed to:", pingContract.address);
  	console.log("Contract deployed by:", owner.address);

	let pingCount;
	pingCount = await pingContract.getTotalPings();

	let pingTxn = await pingContract.ping();
	await pingTxn.wait();

	pingCount = await pingContract.getTotalPings();

	pingTxn = await pingContract.connect(randomPerson).ping();
	await pingTxn.wait();

	pingCount = await pingContract.getTotalPings();
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
