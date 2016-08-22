require 'rack'

require_relative 'upload_handler'

map '/upload' do
  run UploadHandler.new
end
