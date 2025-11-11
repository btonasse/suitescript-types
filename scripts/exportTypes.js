/** This script can be used to export all types into a JSON file. This can be then used as a knowledge base for generative AI */

import fs from "fs/promises";
import path from "path";

const ModuleDescriptions = {
    index: "Global definitions",
    "N/action": "Module for working with record actions",
    "N/auth": "Module for authentication and user management",
    "N/cache": "Module for caching data",
    "N/certificateControl": "Module for managing digital certificates",
    "N/commerce/recordView": "Module for retrieving item and website details",
    "N/compress": "Module for compressing and decompressing files",
    "N/config": "Module for accessing configuration pages",
    "N/crypto/certificate": "Module for signing and verifying XML documents",
    "N/crypto/random": "Module for generating cryptographically secure random data",
    "N/crypto": "Module for cryptographic operations",
    "N/currency": "Module for currency exchange rates",
    "N/currentRecord": "Module for working with the current record in client scripts",
    "N/dataset": "Module for creating and managing datasets",
    "N/datasetLink": "Module for linking datasets",
    "N/email": "Module for sending emails",
    "N/encode": "Module for encoding and decoding strings",
    "N/entryPoints": "Module for SuiteScript entry points",
    "N/error": "Module for creating and managing SuiteScript errors",
    "N/file": "Module for working with files in the file cabinet",
    "N/format/i18n": "Module for international formatting of numbers and strings",
    "N/format": "Module for formatting and parsing data",
    "N/http": "Module for making HTTP requests",
    "N/https/clientCertificate": "Module for making HTTPS requests with client certificates",
    "N/https": "Module for making HTTPS requests",
    "N/keyControl": "Module for managing SSH keys",
    "N/llm": "Module for generative AI and large language models",
    "N/log": "Module for logging messages",
    "N/machineTranslation": "Module for translating text using generative AI",
    "N/pgp": "Module for PGP encryption and decryption",
    "N/piremoval": "Module for removing personal information",
    "N/plugin": "Module for working with custom plug-in implementations",
    "plugins/EmailCapturePlugin": "Plugin for processing captured emails",
    "plugins/EPPlugin": "Plugin for customizing invoice payment processing",
    "plugins/fiConnectivityPlugin": "Plugin for financial institution connectivity",
    "plugins/fiParserPlugin": "Plugin for parsing financial institution data",
    "plugins/glPlugin": "Plugin for customizing GL impacts (SSV2)",
    "plugins/glPluginV1": "Plugin for customizing GL impacts (SSV1)",
    "N/portlet": "Module for creating and managing portlets",
    "N/query": "Module for performing queries against NetSuite records",
    "N/record": "Module for working with NetSuite records",
    "N/recordContext": "Module for getting the context of a record, such as localization",
    "N/redirect": "Module for redirecting the user to different pages within NetSuite",
    "N/render": "Module for generating documents such as PDFs and emails using templates",
    "N/runtime": "Module for accessing the runtime context of the currently executing script",
    "N/scriptTypes/restlet": "Module for creating custom HTTP responses for RESTlet scripts",
    "N/search": "Module for performing searches and working with search results",
    "N/sftp": "Module for working with SFTP",
    "N/sso": "Module for SuiteSignOn token generation",
    "N/suiteAppInfo": "Module for SuiteApp and Bundle information",
    "N/task/accounting/recognition": "Module for accounting recognition tasks",
    "N/task": "Module for asynchronous task management",
    "N/transaction": "Module for transaction record operations",
    "N/translation": "Module for interacting with translation collections",
    "N/ui/dialog": "Module for creating dialog boxes",
    "N/ui/message": "Module for creating message banners",
    "N/ui/serverWidget": "Module for creating and manipulating UI on record forms server-side",
    "N/url": "Module for constructing URLs for NetSuite resources and formatting URL query strings",
    "N/util": "Module for utility functions",
    "N/workbook": "Module for creating and manipulating workbooks",
    "N/workflow": "Module for initiating and triggering workflows",
    "N/xml": "Module for XML document manipulation",
    SuiteScriptV1: "SuiteScript 1.0 definitions",
};

async function exportTypeDefinitions(typesDir = "./types", outputFile = "./types-export.json") {
    const result = {
        description: await fs.readFile("./README.md", "utf8"),
    };

    async function processDirectory(dir, baseDir = typesDir) {
        try {
            const files = await fs.readdir(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = await fs.stat(filePath);

                if (stat.isDirectory()) {
                    await processDirectory(filePath, baseDir);
                } else if (file.endsWith(".d.ts")) {
                    await processTypeFile(filePath, baseDir);
                }
            }
        } catch (error) {
            console.error(`Error reading directory ${dir}:`, error.message);
        }
    }

    async function processTypeFile(filePath, baseDir) {
        try {
            const relativePath = path.relative(baseDir, filePath);
            const cleanedUpPath = relativePath.replace(/\.d\.ts$/, "").replace(/\\/g, "/");

            const key = cleanedUpPath.startsWith("N/plugins") ? cleanedUpPath.slice(2) : cleanedUpPath;
            if (!ModuleDescriptions[key]) {
                console.warn(`Warning: no description found for module "${key}". Skipping.`);
                return;
            }

            const fileContent = await fs.readFile(filePath, "utf8");
            result[key] = {
                types: fileContent,
                description: ModuleDescriptions[key],
            };

            console.log(`Processed: ${key}`);
        } catch (error) {
            console.error(`Error processing file ${filePath}:`, error.message);
        }
    }

    try {
        await fs.access(typesDir);

        await processDirectory(typesDir);

        await fs.writeFile(outputFile, JSON.stringify(result, null, 2));
        console.log(`\nSuccessfully exported ${Object.keys(result).length} type files to ${outputFile}`);

        return result;
    } catch (error) {
        console.error("Error exporting type definitions:", error.message);
        throw error;
    }
}

exportTypeDefinitions()
    .then(() => console.log("Export completed!"))
    .catch((error) => console.error("Export failed:", error));
