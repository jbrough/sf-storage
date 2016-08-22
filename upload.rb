require 'csv'
require 'json'
require 'logger'

require_relative 'queue'

class Upload
  def self.add(client, tmp_file)
    begin

    rescue => e
      Logger.new(STDERR).error(e)
      return e
    end

    return nil
  end
end
