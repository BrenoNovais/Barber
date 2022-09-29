import prisma from "../../prisma/indexs"

interface CheckSubscription {
    user_id: string
}

class CheckSubscriptionService {
    async execute({ user_id }:CheckSubscription ) {

        const status = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                subscription: {
                    select: {
                        id: true,
                        status: true
                    }
                }
            }
        })

        return status
    }
}

export default CheckSubscriptionService