import {clerkClient} from '@clerk/express'
export const protect = async (req, res, next) => {
    try {
        const { userId, has } = await req.auth();

        if(!userId){
            return res.status(401).json({ message: "Unauthorized" })
        }

        const hasPremiumPlan = await has({plan: 'premium'});
        req.plan = hasPremiumPlan ? 'premium' : 'free';
        return next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.code || error.message });
    }
}

export const protectAdmin = async (req, res, next) => {
    try {
        const { userId } = await req.auth();

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const user = await clerkClient.users.getUser(userId);

        const isAdmin = process.env.ADMIN_EMAILS
            .split(",")
            .includes(user.emailAddresses[0].emailAddress);

        if (!isAdmin) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: error.code || error.message,
        });
    }
};