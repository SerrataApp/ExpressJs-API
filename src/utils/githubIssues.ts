import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { Prisma } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

const MyOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new MyOctokit({ auth: process.env.PERSONNAL_TOKEN });

export const addGitHubIssue = async (error: Prisma.PrismaClientKnownRequestError) => {
    await octokit.request('POST /repos/SerrataApp/ExpressJs-API/issues', {
        owner: 'SerrataApp',
        repo: 'ExpressJs-API',
        title: `API error not processed ${error.code}`,
        body: `Une erreur non traité s\'est produite \n Le message d\'erreur est le suivant : \n**Code**: ${error.code} \n**Message**: ${error.message}\n**Info**: ${error.meta?.modelName}, ${error.meta?.target}`,
        assignees: [
          'TangoCh4rlie'
        ],
        labels: [
          'bug',
          'autogenerate'
        ],
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
}