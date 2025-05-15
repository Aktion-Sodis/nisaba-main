/* eslint-disable */
/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const { CognitoIdentityServiceProvider } = require('aws-sdk');

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const userPoolId = process.env.USERPOOL;

async function getOrgIdDirect(username) {
  const user = await cognitoIdentityServiceProvider
    .adminGetUser({ UserPoolId: userPoolId, Username: username })
    .promise();
  return user.UserAttributes.find(
    attr => attr.Name === 'custom:organization_id'
  )?.Value;
};

async function addUserToGroup(username, groupname, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to add ${username} to ${groupname}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    console.log(`Success adding ${username} to ${groupname}`);
    return {
      message: `Success adding ${username} to ${groupname}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function removeUserFromGroup(username, groupname, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to remove ${username} from ${groupname}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminRemoveUserFromGroup(params).promise();
    console.log(`Removed ${username} from ${groupname}`);
    return {
      message: `Removed ${username} from ${groupname}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Confirms as an admin without using a confirmation code.
async function confirmUserSignUp(username, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminConfirmSignUp(params).promise();
    console.log(`Confirmed ${username} registration`);
    return {
      message: `Confirmed ${username} registration`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function disableUser(username, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminDisableUser(params).promise();
    console.log(`Disabled ${username}`);
    return {
      message: `Disabled ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function enableUser(username, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminEnableUser(params).promise();
    console.log(`Enabled ${username}`);
    return {
      message: `Enabled ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUser(username, event) {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to retrieve information for ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
    
    // If this is a direct getUser call (not from another method), check organization
    if (event) {
      const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
      if (!organizationId) {
        throw new Error('No organization ID found');
      }

      const targetUserOrgId = await getOrgIdDirect(username);
      if (targetUserOrgId !== organizationId) {
        throw new Error('Cannot access user from different organization');
      }
    }
    
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listUsers(Limit, PaginationToken, event) {
  const params = {
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(PaginationToken && { PaginationToken }),
  };

  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  console.log('Attempting to list users with organizationId', organizationId);

  try {
    const result = await cognitoIdentityServiceProvider.listUsers(params).promise();

    // Filter users by organization ID
    result.Users = result.Users.filter(user => 
      user.Attributes.some(attr => 
        attr.Name === 'custom:organization_id' && 
        attr.Value === organizationId
      )
    );

    // Get groups for each user
    const usersWithGroups = await Promise.all(result.Users.map(async (user) => {
      const groupsParams = {
        UserPoolId: userPoolId,
        Username: user.Username,
      };
      
      try {
        const groupsResult = await cognitoIdentityServiceProvider.adminListGroupsForUser(groupsParams).promise();
        return {
          ...user,
          Groups: groupsResult.Groups.map(group => group.GroupName)
        };
      } catch (err) {
        console.log(`Error fetching groups for user ${user.Username}:`, err);
        return {
          ...user,
          Groups: []
        };
      }
    }));

    // Replace Users array with the enhanced version
    result.Users = usersWithGroups;

    // Rename to NextToken for consistency with other Cognito APIs
    result.NextToken = result.PaginationToken;
    delete result.PaginationToken;

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listGroups(Limit, PaginationToken, event) {
  const params = {
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(PaginationToken && { PaginationToken }),
  };

  console.log('Attempting to list groups');

  try {
    const result = await cognitoIdentityServiceProvider.listGroups(params).promise();

    // Rename to NextToken for consistency with other Cognito APIs
    result.NextToken = result.PaginationToken;
    delete result.PaginationToken;

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listGroupsForUser(username, Limit, NextToken, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
    ...(Limit && { Limit }),
    ...(NextToken && { NextToken }),
  };

  console.log(`Attempting to list groups for ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminListGroupsForUser(params).promise();
    result.Groups.forEach(val => {
      delete val.UserPoolId, delete val.LastModifiedDate, delete val.CreationDate, delete val.Precedence, delete val.RoleArn;
    });

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function listUsersInGroup(groupname, Limit, NextToken, event) {
  const params = {
    GroupName: groupname,
    UserPoolId: userPoolId,
    ...(Limit && { Limit }),
    ...(NextToken && { NextToken }),
  };

  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  console.log(`Attempting to list users in group ${groupname}`);

  try {
    const result = await cognitoIdentityServiceProvider.listUsersInGroup(params).promise();
    
    // Filter users by organization
    result.Users = result.Users.filter(user => {
      const userOrgId = user.Attributes.find(attr => attr.Name === 'custom:organization_id')?.Value;
      return userOrgId === organizationId;
    });
    
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Signs out from all devices, as an administrator.
async function signUserOut(username, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to signout ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminUserGlobalSignOut(params).promise();
    console.log(`Signed out ${username} from all devices`);
    return {
      message: `Signed out ${username} from all devices`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createUser(username, userGroup, returnPassword, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  const isEmail = username.includes('@');
  
  const userAttributes = [
    {
      Name: 'custom:organization_id',
      Value: organizationId
    }
  ];

  if (isEmail) {
    userAttributes.push(
      { Name: 'email', Value: username },
      { Name: 'email_verified', Value: 'true' }
    );
  } else {
    userAttributes.push(
      { Name: 'phone_number', Value: username },
      { Name: 'phone_number_verified', Value: 'true' }
    );
  }

  let temporaryPassword;
  if (returnPassword) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    
    temporaryPassword = 
      lower[Math.floor(Math.random() * lower.length)] +
      upper[Math.floor(Math.random() * upper.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      special[Math.floor(Math.random() * special.length)] +
      lower[Math.floor(Math.random() * lower.length)] +
      upper[Math.floor(Math.random() * upper.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      special[Math.floor(Math.random() * special.length)];
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
    UserAttributes: userAttributes,
    MessageAction: returnPassword ? 'SUPPRESS' : 'SEND',
    ...(temporaryPassword && { TemporaryPassword: temporaryPassword })
  };

  console.log(`Attempting to create user ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
    
    if (userGroup) {
      await addUserToGroup(username, userGroup, event);
    }

    if (returnPassword) {
      const setPasswordParams = {
        UserPoolId: userPoolId,
        Username: username,
        Password: temporaryPassword,
        Permanent: true
      };
      await cognitoIdentityServiceProvider.adminSetUserPassword(setPasswordParams).promise();
    }

    // Get the complete user object with groups
    const user = await getUser(username, event);
    const groupsResult = await cognitoIdentityServiceProvider.adminListGroupsForUser({
      UserPoolId: userPoolId,
      Username: username
    }).promise();
    
    const userWithGroups = {
      ...user,
      Groups: groupsResult.Groups.map(group => group.GroupName)
    };

    return {
      message: `Successfully created user ${username}`,
      ...(returnPassword && { password: temporaryPassword }),
      user: userWithGroups
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function hardPasswordReset(username, returnPassword, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  let newPassword;
  if (returnPassword) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    
    newPassword = 
      lower[Math.floor(Math.random() * lower.length)] +
      upper[Math.floor(Math.random() * upper.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      special[Math.floor(Math.random() * special.length)] +
      lower[Math.floor(Math.random() * lower.length)] +
      upper[Math.floor(Math.random() * upper.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      special[Math.floor(Math.random() * special.length)];
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
    Password: newPassword,
    Permanent: true
  };

  console.log(`Attempting to reset password for ${username}`);

  try {
    await cognitoIdentityServiceProvider.adminSetUserPassword(params).promise();
    
    if (!returnPassword) {
      await cognitoIdentityServiceProvider.adminResetUserPassword({
        UserPoolId: userPoolId,
        Username: username
      }).promise();
    }

    return {
      message: `Successfully reset password for ${username}`,
      ...(returnPassword && { password: newPassword })
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteUser(username, event) {
  // Get organization ID of the requesting user
  const organizationId = await getOrgIdDirect(event.requestContext.authorizer.claims.username);
  if (!organizationId) {
    throw new Error('No organization ID found');
  }

  // Get target user's organization ID
  const targetUserOrgId = await getOrgIdDirect(username);
  if (targetUserOrgId !== organizationId) {
    throw new Error('Cannot perform action on user from different organization');
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };

  console.log(`Attempting to delete user ${username}`);

  try {
    const result = await cognitoIdentityServiceProvider.adminDeleteUser(params).promise();
    console.log(`Successfully deleted user ${username}`);
    return {
      message: `Successfully deleted user ${username}`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  addUserToGroup,
  removeUserFromGroup,
  confirmUserSignUp,
  disableUser,
  enableUser,
  getUser,
  listUsers,
  listGroups,
  listGroupsForUser,
  listUsersInGroup,
  signUserOut,
  createUser,
  hardPasswordReset,
  deleteUser,
};
