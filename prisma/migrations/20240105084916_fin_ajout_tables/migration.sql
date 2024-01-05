-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT[],
    "img" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageInGameMode" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "gameModeId" INTEGER NOT NULL,

    CONSTRAINT "ImageInGameMode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageInGameMode_imageId_gameModeId_key" ON "ImageInGameMode"("imageId", "gameModeId");

-- AddForeignKey
ALTER TABLE "ImageInGameMode" ADD CONSTRAINT "ImageInGameMode_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageInGameMode" ADD CONSTRAINT "ImageInGameMode_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
