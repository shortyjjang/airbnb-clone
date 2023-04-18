import { NextResponse } from "next/server";

import prisma from '../../../../components/lib/prismadb'
import getCurrentUser from "../../../../components/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoritesIds = [...(currentUser?.favoritesIds || [])];

  favoritesIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser?.id
    },
    data: {
      favoritesIds
    }
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoritesIds = [...(currentUser.favoritesIds || [])];

  favoritesIds = favoritesIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoritesIds
    }
  });

  return NextResponse.json(user);
}