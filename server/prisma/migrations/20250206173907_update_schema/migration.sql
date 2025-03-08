-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Search_History" (
    "history_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "query" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filters" TEXT,
    "results_count" INTEGER NOT NULL,

    CONSTRAINT "Search_History_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Arxiv_Paper" (
    "paper_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "authors" TEXT NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL,
    "doi" TEXT NOT NULL,

    CONSTRAINT "Arxiv_Paper_pkey" PRIMARY KEY ("paper_id")
);

-- CreateTable
CREATE TABLE "Bookmarks" (
    "bookmark_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("bookmark_id")
);

-- CreateTable
CREATE TABLE "Summary" (
    "summary_id" SERIAL NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("summary_id")
);

-- CreateTable
CREATE TABLE "Weekly_Paper" (
    "weekly_paper_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL,
    "authors" TEXT NOT NULL,
    "doi" TEXT NOT NULL,

    CONSTRAINT "Weekly_Paper_pkey" PRIMARY KEY ("weekly_paper_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Arxiv_Paper_doi_key" ON "Arxiv_Paper"("doi");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmarks_user_id_paper_id_key" ON "Bookmarks"("user_id", "paper_id");

-- CreateIndex
CREATE UNIQUE INDEX "Weekly_Paper_doi_key" ON "Weekly_Paper"("doi");

-- AddForeignKey
ALTER TABLE "Search_History" ADD CONSTRAINT "Search_History_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arxiv_Paper" ADD CONSTRAINT "Arxiv_Paper_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "Arxiv_Paper"("paper_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "Arxiv_Paper"("paper_id") ON DELETE CASCADE ON UPDATE CASCADE;
