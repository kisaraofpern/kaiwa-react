# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170510152613) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "animes", force: :cascade do |t|
    t.integer  "anilist_id",       null: false
    t.string   "title_romaji",     null: false
    t.string   "title_english",    null: false
    t.string   "title_japanese",   null: false
    t.string   "genres"
    t.string   "image_url_sml"
    t.string   "image_url_med"
    t.string   "image_url_lge"
    t.string   "image_url_banner"
    t.string   "description"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "animetags", force: :cascade do |t|
    t.integer  "anilist_id", null: false
    t.integer  "user_id"
    t.integer  "tag_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_animetags_on_user_id", using: :btree
  end

  create_table "chats", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "chat_partner_id"
    t.integer  "chat_starter_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["chat_partner_id"], name: "index_chats_on_chat_partner_id", using: :btree
    t.index ["chat_starter_id"], name: "index_chats_on_chat_starter_id", using: :btree
    t.index ["user_id", "chat_partner_id"], name: "index_chats_on_user_id_and_chat_partner_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_chats_on_user_id", using: :btree
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
  end

  create_table "matches", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "matched_user_id"
    t.float    "match_quotient",  null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["matched_user_id"], name: "index_matches_on_matched_user_id", using: :btree
    t.index ["user_id", "matched_user_id"], name: "index_matches_on_user_id_and_matched_user_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_matches_on_user_id", using: :btree
  end

  create_table "messages", force: :cascade do |t|
    t.string   "message",    null: false
    t.integer  "chat_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chat_id"], name: "index_messages_on_chat_id", using: :btree
    t.index ["user_id"], name: "index_messages_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",               default: "", null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "avatar"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "chats", "users"
  add_foreign_key "chats", "users", column: "chat_partner_id"
  add_foreign_key "chats", "users", column: "chat_starter_id"
  add_foreign_key "matches", "users"
  add_foreign_key "matches", "users", column: "matched_user_id"
end
