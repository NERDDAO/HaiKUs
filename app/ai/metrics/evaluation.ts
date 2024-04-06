import { Db } from "mongodb";
import { AIEvaluation, Haikipu } from "~~/types/dbSchema";

export async function storeEvaluationByProject(
    db: Db,
    projectId: string,
    usedEmbeddings: string[],
    embeddingId: string,
    haikipu: Haikipu
) {
    const hackCodex = db.collection("nerdWork");
    const evaluations = db.collection("evaluations");

    const evaluationData = {
        projectId,
        usedEmbeddings,
        haikipu,
        embeddingId,
    };

    const addEvalResult = await hackCodex.updateOne(
        { id: projectId },
        { $addToSet: { eval: evaluationData } },
        { upsert: true },
    );

    const evalResult = await evaluations.insertOne(evaluationData);

    return { haikipu, result: evalResult, addEvalResult };
}
