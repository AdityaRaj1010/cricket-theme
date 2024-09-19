import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import mongoose from 'mongoose';

interface Score {
  runs: number;
  wickets: number;
  overs: number;
}

const ScoreSchema = new mongoose.Schema<Score>({
  runs: Number,
  wickets: Number,
  overs: Number,
});

const Score = mongoose.models.Score || mongoose.model<Score>('Score', ScoreSchema);

export async function GET() {
  await dbConnect();
  const score = await Score.findOne().sort({ _id: -1 });
  return NextResponse.json(score);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { runs, wickets, overs }: Score = body;
  await dbConnect();
  const newScore = new Score({ runs, wickets, overs });
  await newScore.save();
  return NextResponse.json(newScore);
}

// •