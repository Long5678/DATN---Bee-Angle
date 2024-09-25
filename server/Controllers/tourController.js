const TourModel = require('../Models/tourModel');
<<<<<<< HEAD
const {
    initializeApp
} = require("firebase/app");
const {
    getStorage
} = require("firebase/storage");
const {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject
} = require('firebase/storage');
=======
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getDownloadURL, ref, uploadBytesResumable, deleteObject } = require('firebase/storage');
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
const firebaseConfig = require("../Configs/firebase.config");
const asyncHandler = require('express-async-handler');

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);

const addTour = asyncHandler(async (req, res) => {
    const { name, description, price, location, type, status} = req.body;

    const downloadImageURLs = [];
    const downloadVideoURLs = [];

    try {
        for (const file of req.files['images']) {
            const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
            const metadata = {
                contentType: file.mimetype
            };
=======
            const metadata = { contentType: file.mimetype };
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            downloadImageURLs.push(downloadURL);
        }

        if (req.files['videos']) {
            for (const file of req.files['videos']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
                const metadata = {
                    contentType: file.mimetype
                };
=======
                const metadata = { contentType: file.mimetype };
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                downloadVideoURLs.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
<<<<<<< HEAD

=======
    
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
    const newTour = new TourModel({
        name,description,price,location,type,status,images: downloadImageURLs,videos: downloadVideoURLs
    });

    await newTour.save();
    res.status(201).json(newTour);
});

const updateTour = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        description,
        price,
        location,
        type,
<<<<<<< HEAD
        status
    } = req.body;
=======
        status,
        images: downloadImageURLs,
        videos: downloadVideoURLs
    });

    await newTour.save();
    res.status(201).json(newTour);
});

const updateTour = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, location, type, status } = req.body;
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
    const tour = await TourModel.findById(id);

    try {
        for (const imageURL of tour.images) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            const imageRef = ref(storages, imageFileName);
            await deleteObject(imageRef);
        }

        for (const videoURL of tour.videos) {
            const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
            const videoRef = ref(storages, videoFileName);
            await deleteObject(videoRef);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    const updatedImages = [];
    const updatedVideos = [];

    try {
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
                const metadata = {
                    contentType: file.mimetype
                };
=======
                const metadata = { contentType: file.mimetype };
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedImages.push(downloadURL);
            }
        }

        if (req.files && req.files['videos']) {
            for (const file of req.files['videos']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
                const metadata = {
                    contentType: file.mimetype
                };
=======
                const metadata = { contentType: file.mimetype };
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedVideos.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    tour.name = name || tour.name;
    tour.description = description || tour.description;
    tour.price = price || tour.price;
    tour.location = location || tour.location;
    tour.type = type || tour.type;
    tour.status = status || tour.status;
    tour.images = updatedImages;
    tour.videos = updatedVideos;

    const updatedTour = await tour.save();
    res.status(200).json(updatedTour);
});


const deleteTour = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const {
        id
    } = req.params;

    try {
        console.log(id);
        const tourdel = await TourModel.findByIdAndDelete(id);
        // const tour = await TourModel.findById(id);
        // Find and delete the tour document in a single step

        // if (!tour) {
        //     return res.status(404).json({
        //         message: "Tour not found"
        //     });
        // }

        // Delete associated images and videos
        // for (const imageURL of tour.images) {
        //     const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
        //     const imageRef = ref(storages, imageFileName);
        //     await deleteObject(imageRef);
        // }

        // for (const videoURL of tour.videos) {
        //     const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
        //     const videoRef = ref(storages, videoFileName);
        //     await deleteObject(videoRef);
        // }

        res.status(200).json(tourdel);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
=======
    const { id } = req.params;
    const tour = await TourModel.findById(id);

    try {
        for (const imageURL of tour.images) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            const imageRef = ref(storages, imageFileName);
            await deleteObject(imageRef);
        }

        for (const videoURL of tour.videos) {
            const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
            const videoRef = ref(storages, videoFileName);
            await deleteObject(videoRef);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    await tour.deleteOne();
    res.status(200).json(tour);
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
});


const getAllTours = asyncHandler(async (req, res) => {
    const tours = await TourModel.find();
<<<<<<< HEAD
    console.log(tours);

    res.status(200).json(tours);
=======

        res.status(200).json(tours);
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
});

// Lấy thông tin chi tiết của một tour theo ID
const getTourById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const tour = await TourModel.findById(id);

    res.status(200).json(tour);
});

module.exports = {
    addTour,
    updateTour,
    deleteTour,
    getAllTours,
    getTourById
}