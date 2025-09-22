import { useEffect } from 'react'
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function Team() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach((reveal) => observer.observe(reveal))

    return () => observer.disconnect()
  }, [])

  const teamMembers = [
    {
      name: 'Dhawaleshwa Rao',
      role: 'Mentor & AI/ML Expert',
      bio: 'Leading AI innovation with 8+ years of experience in machine learning, deep learning, and data science. Passionate about mentoring and building intelligent solutions.',
      skills: ['AI/ML', 'Python', 'TensorFlow', 'Data Science', 'Mentoring'],
      avatar: '/images/Dk.jpeg',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'saneev@teamelevateX.com'
      },
      featured: true
    },
    {
      name: 'Ravi Kumar',
      role: 'Core Community Lead',
      bio: 'Community building expert focused on fostering developer engagement and creating inclusive tech communities. Passionate about connecting people through technology.',
      skills: ['Community Management', 'Leadership', 'Events', 'Networking', 'Strategy'],
      avatar: '/images/Rk.jpeg',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'basir@teamelevateX.com'
      },
      featured: true
    },
    {
      name: 'Anikt Kumar',
      role: 'Core Community Lead',
      bio: 'Tech community advocate with expertise in developer relations and community growth. Dedicated to creating meaningful connections in the developer ecosystem.',
      skills: ['Developer Relations', 'Community Growth', 'Public Speaking', 'Tech Events', 'Collaboration'],
      avatar: '/images/Ankit.jpeg',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'aniket@teamelevateX.com'
      },
      featured: true
    },
    {
      name: 'Dipak Kumar',
      role: 'Core Community Lead',
      bio: 'Leading AI innovation with 8+ years of experience in machine learning, deep learning, and data science. Passionate about mentoring and building intelligent solutions.',
      skills: ['AI/ML', 'Python', 'TensorFlow', 'Data Science', 'Mentoring'],
      avatar: '/images/Dipak.jpeg',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'saneev@teamelevateX.com'
      },
      featured: true
    },

    {
      name: 'Pawan Kumar',
      role: 'Core Community Lead',
      bio: 'Leading AI innovation with 8+ years of experience in machine learning, deep learning, and data science. Passionate about mentoring and building intelligent solutions.',
      skills: ['AI/ML', 'Python', 'TensorFlow', 'Data Science', 'Mentoring'],
      avatar: '/images/pawan.jpeg',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'saneev@teamelevateX.com'
      },
      featured: true
    },
    {
      name: 'Ankit Sah',
      role: 'Core Community Lead',
      bio: 'Leading AI innovation with 8+ years of experience in machine learning, deep learning, and data science. Passionate about mentoring and building intelligent solutions.',
      skills: ['AI/ML', 'Python', 'TensorFlow', 'Data Science', 'Mentoring'],
      avatar: '/images/AnkitSah.jpeg',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'saneev@teamelevateX.com'
      },
      featured: true
    },
  ]

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-ping" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-500/20 border border-purple-400/30 rounded-full text-sm font-bold text-purple-300 mb-8 animate-fade-in backdrop-blur-md">
            <Sparkles className="w-4 h-4 animate-spin" />
            MEET OUR LEADERSHIP TEAM
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Our Expert
            </span>
            <br />
            <span className="text-white">Leadership</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet the visionaries behind TeamElevateX - industry experts dedicated to 
            driving innovation and fostering community growth in the tech ecosystem.
          </p>
        </div>

        {/* Team Cards - 3 in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-purple-900/30 border border-purple-500/30 backdrop-blur-lg hover:border-purple-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 reveal card-glow"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0 relative">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Avatar Section with Enhanced Effects */}
                <div className="relative overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Hover Social Icons Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                      <div className="flex space-x-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <a
                          href={member.socials.github}
                          className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={member.socials.linkedin}
                          className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                          href={`mailto:${member.socials.email}`}
                          className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    {/* Corner Badge for Featured Members */}
                    {member.featured && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10">
                  {/* Name and Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-purple-400 font-semibold text-sm bg-purple-500/20 px-3 py-1 rounded-full inline-block border border-purple-500/30">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center min-h-[4rem]">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider text-center">
                      Core Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-700/50 text-cyan-400 rounded-full text-xs font-medium hover:bg-purple-500/30 hover:text-white transition-all duration-300 cursor-default border border-slate-600/50 hover:border-purple-400/50"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white rounded-full text-xs font-medium cursor-default border border-purple-400/50">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-20 reveal">
          <div className="bg-gradient-to-r from-purple-900/30 via-slate-900/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-purple-500/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group cursor-default">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
                <div className="text-gray-300 font-medium">Years Combined Experience</div>
              </div>
              <div className="group cursor-default">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">∞</div>
                <div className="text-gray-300 font-medium">Community Impact</div>
              </div>
              <div className="group cursor-default">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-300 font-medium">Mentorship Available</div>
              </div>
              <div className="group cursor-default">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">🚀</div>
                <div className="text-gray-300 font-medium">Innovation Drive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 reveal">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">Elevate</span> Your Project?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with our expert team to discuss your vision and discover how we can 
            transform your ideas into revolutionary digital solutions.
          </p>
          <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden">
            <span className="relative z-10 flex items-center space-x-3">
              <span>Start Your Journey</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
