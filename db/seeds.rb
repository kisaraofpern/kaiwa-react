# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)w
# random_names = [
#   "GigaStrength", "TechPill", "tree_eater", "fire_spawn", "WebTool",
#   "couch_chiller", "DeathDog", "junkTop", "awesometrucker", "BinaryMan",
#   "sniperxgod", "Sharpcharm", "idontknow", "alexander_hamilton", "BooTeeFool",
#   "fried+sushi", "superxgrass", "Lunatick", "spamsalot", "GoogleCat",
#   "going_to_the_dogs", "true_dat", "otaku", "in_the_heights", "i_need_cafe"
# ]
#
random_anime_ids = [
  20680, 21177, 21196, 21197, 21236, 21238, 21241, 21265, 21284, 21290, 21291,
  21296, 21297, 21300, 21302, 21311, 21315, 21316, 21321, 21334, 21355, 21357,
  21360, 21362, 21390, 21394, 21421, 21423, 21426, 21427, 21445, 21449, 21450,
  21459, 21462, 21470, 21474, 21487, 21495, 21499
]

20.times do |index|
  User.create(
    username: random_names[index],
    email: "ward#{index}@ward.com",
    password: "password"
  )
end

500.times do
  user_index = 1+rand(20)
  anilist_index = rand(40)
  tag_id = rand(4)

  Animetag.create(
    anilist_id: random_anime_ids[anilist_index],
    tag_id: tag_id,
    user_id: user_index
  )
end

Populated matches
20.times do |index|
  i = index + 1
  j = index + 2
  for k in j..20
    user_one = User.find(i)
    user_two = User.find(k)
    match_quotient = user_one.get_match_quotient(user_two)
    Match.create(
      user: user_one,
      matched_user: user_two,
      match_quotient: match_quotient
    )
  end
end
