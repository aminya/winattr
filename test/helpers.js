"use strict";
const fs = require("fs");
const {resolve: resolvePath} = require("path");
const winattr = require("../lib");

const isWindows = process.platform.startsWith("win");



const allAttribs = () =>
{
	const all = defaultAttribs();

	for (let i in all)
	{
		if (all[i] === false)
		{
			all[i] = true;
		}
	}

	return all;
};



const defaultAttribs = overrides =>
{
	const defaults =
	{
		archive: false,
		hidden: false,
		readonly: false,
		system: false
	};

	return (overrides!=null) ? Object.assign(defaults,overrides) : defaults;
};



const newFile = (path, attrs, lib, callback) =>
{
	path = resolvePath(__dirname, path);

	let winattrError, setgetError

	fs.writeFile(path, "", async writeError =>
	{
		if (writeError!=null) return callback(writeError);

		switchLib(lib);

		try {
			await setget(path, attrs)
		} catch(err) {
			setgetError = err
		}

		// Set attributes to false to avoid EPERM issues when deleting
		try {
			await winattr.set(path, defaultAttribs())
		} catch(err) {
			winattrError = err
		}

		// Remove test file
		fs.unlink(path, unlinkError =>
		{
			callback(unlinkError || winattrError || setgetError || null, attrs);
		});

	});

};



const newFileSync = (path, attrs, lib) =>
{
	var attrs;

	path = resolvePath(__dirname, path);

	fs.writeFileSync(path, "");

	try
	{
		switchLib(lib);

		attrs = setgetSync(path, attrs);

		// Set attributes to false to avoid EPERM issues when deleting
		winattr.setSync( path, defaultAttribs() );
	}
	catch (error)
	{
		// Remove test file
		fs.unlinkSync(path);

		throw error;
	}

	// Remove test file
	fs.unlinkSync(path);

	return attrs;
};



const newFolder = (path, attrs, lib, callback) =>
{
	path = resolvePath(__dirname, path);

	let setgetError, winattrError

	fs.mkdir(path, async mkError =>
	{
		if (mkError!=null) return callback(mkError);

		switchLib(lib);

		try {
			await setget(path, attrs)
		} catch (error) {
			setgetError = error
		}
		// Set attributes to false to avoid EPERM issues when deleting
		try {
			await winattr.set(path, defaultAttribs())
		} catch (error) {
			winattrError = error
		}

		// Remove test dir
		fs.rmdir(path, rmError =>
		{
			callback(rmError || winattrError || setgetError || null, attrs);
		});

	});
};



const newFolderSync = (path, attrs, lib) =>
{
	var attrs;

	path = resolvePath(__dirname, path);

	fs.mkdirSync(path);

	try
	{
		switchLib(lib);

		attrs = setgetSync(path, attrs);

		// Set attributes to false to avoid EPERM issues when deleting
		winattr.setSync( path, defaultAttribs() );
	}
	catch (error)
	{
		// Remove test dir
		fs.rmdirSync(path);

		throw error;
	}

	// Remove test dir
	fs.rmdirSync(path);

	return attrs;
};



const setget = async (path, attrs) =>
{
	try {
		await winattr.set(path, attrs)
	} catch (error) {
		throw error
	}
	await winattr.get(path);
};



const setgetSync = (path, attrs) =>
{
	winattr.setSync(path, attrs);

	return winattr.getSync(path);
};



const switchLib = lib =>
{
	switch (lib)
	{
		case "auto":
		case "shell":
		{
			winattr.change(lib);
			break;
		}
		case "binding":
		{
			winattr.change(lib, true);
			break;
		}
	}
};



module.exports =
{
	allAttribs,
	defaultAttribs,
	isWindows,
	newFile,
	newFileSync,
	newFolder,
	newFolderSync
};
