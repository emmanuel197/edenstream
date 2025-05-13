export const checkActiveSubscription = (userSubscriptions) => {
    // Get the current date and time
    const currentDateTime = new Date();

    // Filter out free plans
    const activeSubscriptions = userSubscriptions.filter(subscription => subscription.price !== 0);


    // Iterate through each subscription record
    for (const subscription of activeSubscriptions) {
        // Check if the subscription is active
        if (subscription.status === "Active") {
            // Convert subscription start and end dates to Date objects
            const startDate = new Date(subscription.purchase_date + " " + subscription.purchase_time);
            const endDate = new Date(subscription.end_date + " " + subscription.end_time);

            // Check if the current date and time fall within the subscription period
            if (currentDateTime >= startDate && currentDateTime <= endDate) {
                return true; // User has an active subscription
            }
        }
    }
    return false; // No active subscription found
}

// JSON data representing user subscriptions




