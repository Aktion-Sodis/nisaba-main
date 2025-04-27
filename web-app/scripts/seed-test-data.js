const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const { fromEnv } = require('@aws-sdk/credential-provider-env');

const client = new LambdaClient({
  region: process.env.AWS_REGION || 'eu-central-1',
  credentials: fromEnv(),
});

async function seedTestData(organizationId) {
  const command = new InvokeCommand({
    FunctionName: 'seedTestData',
    Payload: JSON.stringify({
      organizationId,
    }),
  });

  try {
    const response = await client.send(command);
    const result = JSON.parse(Buffer.from(response.Payload).toString());
    console.log('Seeding result:', result);
  } catch (error) {
    console.error('Error seeding test data:', error);
  }
}

// Get organization ID from command line argument
const organizationId = process.argv[2];
if (!organizationId) {
  console.error('Please provide an organization ID as a command line argument');
  process.exit(1);
}

seedTestData(organizationId);
