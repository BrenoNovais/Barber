import prisma from "../../prisma/indexs"

interface CountRequest {
    user_id: string
}

class CountHaircutService{
    async execute({user_id}: CountRequest) {

        const count = await prisma.haircut.count({
            where: {
                user_id: user_id
            }
        })

        return count
    }
}

export default CountHaircutService