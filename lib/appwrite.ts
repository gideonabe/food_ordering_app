import { CreateUserParams, SignInParams } from "@/type";
import { ErrorBoundary } from "expo-router";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERCOLLECTION_ID!,
  platform: "com.deon.foodordering",
}

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)

    if(!newAccount) throw Error;

    await signin({email, password});

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.userCollectionId, 
      ID.unique(),
      {
        accountId: newAccount.$id,
        email, name, avatar: avatarUrl
      } 
    )

  } catch (error) {
    throw new Error(error as string)
  }
}

export const signin = async ({email, password}: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error as string)
  }
}