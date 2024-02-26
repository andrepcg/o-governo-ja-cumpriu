require "active_support"
require "active_support/core_ext/enumerable"

# Read the offset from command line argument
offset = ARGV[0].to_i

# Read the contents of template.md and input.txt
template_content = File.read('template.md')
input_lines = File.readlines('input.txt').compact_blank

# For each line in input.txt, create a new document with template content
input_lines.each_with_index do |line, index|
  # Replace the placeholder with the line from input.txt
  new_content = template_content.gsub('%CONTENT%', line.chomp.strip)

  # Write the new document to a file with index and offset
  File.open("#{index + offset}.md", 'w') { |file| file.write(new_content) }
end

puts "Documents created successfully!"
