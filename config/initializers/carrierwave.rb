require 'carrierwave/orm/activerecord'

CarrierWave.configure do |config|
  if !Rails.env.test?
    config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => ENV["AWS_CLIENT_ID"],
      :aws_secret_access_key  => ENV["AWS_CLIENT_SECRET"],
      # Change this for different AWS region. Default is 'us-east-1'
    }
    config.fog_directory       = ENV["AWS_S3_BUCKET"]
  end
end
