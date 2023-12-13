const asyncHandler = require('express-async-handler')
const Crowns = require('../models/achievements.js')
const User = require('../models/User')
const rankedposts = require('../models/rankedposts')
const Post = require('../models/posts')
const Notifications = require ('../models/notifications.js')

const getNotificationById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const notifications = await Notifications.find({ recipSlug: id, read: { $ne: true } })
      .select('-password')
      .lean();
    
    // If no notifications
    if (!notifications || notifications.length === 0) {
      return res.json([]);
    }
  
    res.json(notifications);
  });

const updateNotifications = asyncHandler(async (req, res) => {
    try {
        const { notifications } = req.body;
        console.log(notifications)
    
        // Update the notifications to set the 'read' field to 'true'
        await Notifications.updateMany(
          { _id: { $in: notifications.map(notification => notification._id) } },
          { $set: { read: true } }
        );
    
        // Return a success response
        res.status(200).json({ message: 'Notifications updated successfully.' });
      } catch (error) {
        console.error('Error updating notifications:', error);
        // Return an error response
        res.status(500).json({ message: 'Failed to update notifications.' });
      }
    });

    const createNotification = asyncHandler(async (req, res) => {
        const {
          senderSlug,
          senderProfImage,
          senderDisplayName,
          recipSlug,
          postSlug,
          postImage,
          action,
          actionImage,
          starQuantity,
          donationQuantity,
          achievement,
          read,
        } = req.body;

        console.log(postImage)
        console.log(recipSlug)

        // Confirm data
        const requiredFields = ['senderSlug', 'senderProfImage', 'recipSlug', 'action', 'senderDisplayName'];
        const missingFields = requiredFields.filter((field) => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(201).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const notificationsObject = {
          senderSlug,
          senderProfImage,
          recipSlug,
          action,
          senderDisplayName,
          ...(postSlug && { postSlug }),
          ...(postImage && { postImage }),
          ...(actionImage && { actionImage }),
          ...(starQuantity && { starQuantity }),
          ...(donationQuantity && { donationQuantity }),
          ...(achievement && { achievement }),
          ...(read && { read }),
        };

        if (action.includes('Followed you')) {
          notificationsObject.actionImage = '/images/44eb66829a8391f5a500c955ef7aca23';
        }

        if (action.includes('Supported you')) {
          notificationsObject.actionImage = '/images/7a7dd08cbfd8eef33a1d6e4567516246';
        }

        if (action.includes('Made a donation')) {
          notificationsObject.actionImage = '/images/7ba3f3c59b266c8dbea9b141e7e5fcff';
        }

        if (action.includes('Liked your post')) {
          notificationsObject.actionImage = '/images/48c0c09a464c1201fef174014561a481';
        }

        if (action.includes('Shared your post')) {
          notificationsObject.actionImage = '/images/571f6ccfe79002095caa450d4ab7a2fc';
        }

        if (action.includes('Gave you stars')) {
          notificationsObject.actionImage = '/images/b0c5d047b0364ca86530a27a53f609c3';
        }

        if (action.includes('Mentioned you')) {
          notificationsObject.actionImage = '/images/b062f2f940fb5f3ea90f5d61cd0f341e';
        }

        if (action.includes('Left a comment')) {
          notificationsObject.actionImage = '/images/d187d1e545e5478e01b5350fcd68b293';
        }
      
        // Create and store new notification
        const notification = await Notifications.create(notificationsObject);
      
        if (!notification) {
          return res.status(400).json({ message: 'Invalid notification data received' });
        }
      
        res.status(201).json({
          message: `New notification created by ${senderSlug}`,
        });
      });

      const deleteOldReadNotifications = async () => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      
        try {
          const result = await Notifications.deleteMany({
            read: true,
            actionDate: { $lt: threeDaysAgo }
          });
          console.log(`${result.deletedCount} old read notifications deleted.`);
        } catch (error) {
          console.error('Error deleting old read notifications:', error);
        }
      };

      function runAt12PM() {
        const now = new Date();
        const target = new Date();
        target.setHours(12, 0, 0, 0); // Set the target time to 12:00 PM
      
        if (now >= target) {
          target.setDate(target.getDate() + 1); // If it's already past 12:00 PM, set the target to tomorrow
        }
      
        const delay = target.getTime() - now.getTime(); // Calculate the delay in milliseconds
      
        setTimeout(() => {
          deleteOldReadNotifications(); // Call the function to delete old read notifications
      
          // Call the function again to schedule the next execution for the next day
          runAt12PM();
        }, delay);
      }
      
      runAt12PM();

module.exports = {
    getNotificationById,
    createNotification,
    updateNotifications
}