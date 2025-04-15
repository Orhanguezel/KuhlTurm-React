import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  author?: string;
  category?: string;
  language: "tr" | "en" | "de";
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema: Schema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    summary: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String },
    category: { type: String },
    language: {
      type: String,
      enum: ["tr", "en", "de"],
      default: "en",
    },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik olarak eklenir
  }
);

// Otomatik slug oluşturma (isteğe bağlı)
newsSchema.pre("validate", function (this: INews, next) {
    if (!this.slug && this.title) {
      this.slug = this.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }
    next();
  });
  

const News = mongoose.model<INews>("News", newsSchema);
export default News;
