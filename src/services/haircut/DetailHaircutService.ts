import prisma from "../../prisma/indexs"

interface DetailRequest {
    haircut_id: string
}

class DetailHaircutService {
    
    async execute({haircut_id}: DetailRequest) {
        

        const haircut = await prisma.haircut.findFirst({
            where: {
                id: haircut_id
            }
        })

        return haircut
    }
}

export default DetailHaircutService